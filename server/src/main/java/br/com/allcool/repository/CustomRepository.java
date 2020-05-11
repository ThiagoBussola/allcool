package br.com.allcool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface CustomRepository<T, I> extends JpaRepository<T, I> {

    T findByIdThrow(I id);
}
